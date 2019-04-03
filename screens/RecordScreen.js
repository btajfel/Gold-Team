import { Constants, Camera, FileSystem, Location, Permissions, BarCodeScanner } from 'expo';

import React from 'react';
import {
  Alert,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  Slider,
  Platform
} from 'react-native';
import GalleryScreen from './GalleryScreen';
import isIPhoneX from 'react-native-is-iphonex';
import {NavigationEvents} from 'react-navigation';

import { 
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

const wbIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent',
};



export default class CameraScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
      const {navigate} = navigation;
      const params = navigation.state.params || {};
      return {
        headerRight: (
        <TouchableOpacity
            style={styles.toggleButton}
            onPress={params.signOutAsync}
           >
           <Text style={{color: 'blue', fontSize: 18}}>Logout</Text>
        </TouchableOpacity>
        ),
      };
    };

  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    barcodeScanning: false,
    faceDetecting: false,
    faces: [],
    newPhotos: false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,
    projectID: 0,
    allCollabs: [],
    friends: undefined,
    friendsSizes: [],
    friendsId: 0,
    recording: false,
    recordingIcon: 'ios-radio-button-off',
    recordingColor: 'white',
    showGallery: false,
    showQualityOptions: false,
    showFriendsOptions: false,
    wasInvited: false,
    statePid: 0,
    inviter: "",
  };



  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    if (status === 'granted'){
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({ permissionsGranted: status === 'granted' });
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ signOutAsync: this._signOutAsync.bind(this) });
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
  }

  _signOutAsync = async () => {
    console.log("Sign Out!")
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  paramsFunction = async () => {
    this.updateLocation();
    this.fetchPending();
    let array = [];
    const pid = this.props.navigation.getParam('data', 0);
    const invitedPid = this.state.statePid;
    if (pid !== 0){
     const url = `http://crewcam.eecs.umich.edu/api/v1/${pid}/invite/`;
     fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          allCollabs: res.collaborators,
        });
      })
      .then(() => {
        this.collectFriends();

      })
      .catch(error => {
       console.log(error);
      });
    }
    if (invitedPid !== 0){
     const url = `http://crewcam.eecs.umich.edu/api/v1/${invitedPid}/invite/`;
     fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          allCollabs: res.collaborators,
        });
      })
      .then(() => {
        this.collectFriends();

      })
      .catch(error => {
       console.log(error);
      });
    }
  };

  updateLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let myLoc = await Location.getCurrentPositionAsync({});
    const latitude = myLoc.coords.latitude;
    const longitude = myLoc.coords.longitude;

    const url = `http://crewcam.eecs.umich.edu/api/v1/location/`;
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             username: AsyncStorage.getItem("userToken"),
             latitude: latitude,
             longitude: longitude,
          }) 
        })
      } catch (e) {
        console.error(e)
      }
  };

  fetchPending = async () => {
    let wasInvited = false;
    let inviter = "";
    let pid = 0;
    const username = AsyncStorage.getItem("userToken")
    console.log(username)
    const url = `http://crewcam.eecs.umich.edu/api/v1/${username}/pending/`;
      fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.status === "true"){
        this.setState({
          wasInvited: res.status,
          statePid: res.pid,
          inviter: res.inviter,
        });
        console.log(res.pid);
        console.log(res.inviter);
        wasInvited = true;
        pid = res.pid;
        inviter = res.inviter;
      }
      })
      .then(() => {
        if(wasInvited === true){
          this.notifyInvite(pid, inviter);
        }
      })
      .catch(error => {
       console.log(error);
      });
  };


 notifyInvite = async (pid, inviter) => {
   const {navigate} = this.props.navigation;
   const invite = inviter;
      Alert.alert(
      `${invite} has invited you to join a project`,
        "",
    
    [
    {text: "Deny", onPress: () => this.denyInvite(pid,inviter)},
    {text: "Accept", onPress: () => this.acceptInvite(pid,inviter)}
    ]
    )

  };

  acceptInvite = async (pid, inviter) => {
    const decision = "accept"
     const url = `http://crewcam.eecs.umich.edu/api/v1/${decision}/pending/`;
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             username: "azarrabi",
             inviter: inviter,
             pid: pid,
          }) 
        })
      } catch (e) {
        console.error(e)
      }
  };

  denyInvite = async (pid, inviter) => {
    const decision = "deny"
     const url = `http://crewcam.eecs.umich.edu/api/v1/${decision}/pending/`;
      try {
        await fetch(url, {
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify( {
             username: "azarrabi",
             inviter: inviter,
             pid: pid,
          }) 
        })
      } catch (e) {
        console.error(e)
      }
  };




  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  toggleView = () => this.setState({ showGallery: !this.state.showGallery, newPhotos: false });

  toggleQualityOptions = () => this.setState({ showQualityOptions: !this.state.showQualityOptions });

  toggleFriendsOptions = () => this.setState({ showFriendsOptions: !this.state.showFriendsOptions });

  toggleFacing = () => this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });

  toggleFlash = () => this.setState({ flash: flashModeOrder[this.state.flash] });

  setRatio = ratio => this.setState({ ratio });

  toggleWB = () => this.setState({ whiteBalance: wbOrder[this.state.whiteBalance] });

  toggleFocus = () => this.setState({ autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on' });

  zoomOut = () => this.setState({ zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1 });

  zoomIn = () => this.setState({ zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1 });

  setFocusDepth = depth => this.setState({ depth });

  toggleBarcodeScanning = () => this.setState({ barcodeScanning: !this.state.barcodeScanning });

  toggleFaceDetection = () => this.setState({ faceDetecting: !this.state.faceDetecting });

  takeVideo = async () => {
    if (this.camera) {
      if (this.state.recording) {
        this.setState({ 
          recording: !this.state.recording,
          recordingIcon: 'ios-radio-button-off',
          recordingColor: 'white',
        });
        this.camera.stopRecording();
      }
      else {
        this.setState({ 
          recording: !this.state.recording,
          recordingIcon: 'ios-radio-button-on',
          recordingColor: 'red',
        });
        const video = await this.camera.recordAsync();
        console.log(video);
        await FileSystem.moveAsync({
          from: video.uri,
          to: `${FileSystem.documentDirectory}photos/${Date.now()}.mov`,
        });
        this.setState({ newPhotos: true });
      }
    }
  };

  handleMountError = ({ message }) => console.error(message);

  onBarCodeScanned = code => {
    this.setState(
      { barcodeScanning: !this.state.barcodeScanning },
      Alert.alert(`Barcode found: ${code.data}`)
    );
  };

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  collectPictureSizes = async () => {
    if (this.camera) {
      const pictureSizes = await this.camera.getAvailablePictureSizesAsync(this.state.ratio);
      let pictureSizeId = 0;
      if (Platform.OS === 'ios') {
        pictureSizeId = pictureSizes.indexOf('High');
      } else {
        // returned array is sorted in ascending order - default size is the largest one
        pictureSizeId = pictureSizes.length-1;
      }
      this.setState({ pictureSizes, pictureSizeId, pictureSize: pictureSizes[pictureSizeId] });
    }
  };

  previousPictureSize = () => this.changePictureSize(1);
  nextPictureSize = () => this.changePictureSize(-1);

  changePictureSize = direction => {
    let newId = this.state.pictureSizeId + direction;
    const length = this.state.pictureSizes.length;
    if (newId >= length) {
      newId = 0;
    } else if (newId < 0) {
      newId = length -1;
    }
    this.setState({ pictureSize: this.state.pictureSizes[newId], pictureSizeId: newId });
  };

    collectFriends= async () => {
     let friendsSizes = [];
     let friendsId = 0;
    if (this.state.allCollabs){
      collabs = this.state.allCollabs;
      var i;
      for (i = 0; i < collabs.length; i++){
        if (i === 0){
          friendsSizes.push(collabs[0].username1);
        }
          friendsSizes.push(collabs[i].username2);
      }
    }
      this.setState({friendsSizes, friendsId, friends: friendsSizes[friendsId] });
  };


  previousFriends = () => this.changeFriends(1);
  nextFriends = () => this.changeFriends(-1);

  changeFriends = direction => {
    let newId = this.state.friendsId + direction;
    const length = this.state.friendsSizes.length;
    if (newId >= length) {
      newId = 0;
    } else if (newId < 0) {
      newId = length -1;
    }
    this.setState({ friends: this.state.friendsSizes[newId], friendsId: newId });
  };

  renderGallery() {
    return <GalleryScreen onPress={this.toggleView.bind(this)} />;
  }

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` },
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}>
        <Text style={styles.faceText}>ID: {faceID}</Text>
        <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
        <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </View>
    );
  }

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  }

  renderFaces = () => 
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>

  renderLandmarks = () => 
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>

  renderNoPermissions = () => 
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  renderTopBar = () => {
  if (this.state.recording){
    return(
    <View
      style={styles.topBar}>
      <TouchableOpacity style={styles.toggleButton}>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
        <MaterialIcons name={flashIcons[this.state.flash]} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleWB}>
        <MaterialIcons name={wbIcons[this.state.whiteBalance]} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleQualityOptions}>
       <Ionicons name="ios-options" size={32} color="white" />
      </TouchableOpacity>   
    </View>
    )
  }
  else{
    return(
    <View
      style={styles.topBar}>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFacing}>
        <Ionicons name="ios-reverse-camera"size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleFlash}>
        <MaterialIcons name={flashIcons[this.state.flash]} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleWB}>
        <MaterialIcons name={wbIcons[this.state.whiteBalance]} size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={this.toggleQualityOptions}>
        <Ionicons name="ios-options" size={32} color="white" />
      </TouchableOpacity>   
    </View>
    )
  }
}

  renderBottomBar = () =>
    <View
      style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomButton} onPress={this.toggleFriendsOptions}>
        <Ionicons name="ios-contact" size={30} color="white"/>
      </TouchableOpacity>
      <View style={{ flex: 0.4 }}>
        <TouchableOpacity
          onPress={this.takeVideo}
          style={{ alignSelf: 'center' }}
        >
          <Ionicons name={ this.state.recordingIcon } size={70} color={ this.state.recordingColor } />
        </TouchableOpacity>
      </View> 
      <TouchableOpacity style={styles.bottomButton} onPress={this.toggleView}>
        <View>
          <Foundation name="thumbnails" size={30} color="white" />
          {this.state.newPhotos && <View style={styles.newPhotosDot}/>}
        </View>
      </TouchableOpacity>
    </View>

  renderQualityOptions = () =>
    (
      <View style={styles.qualityOptions}>
        <View style={styles.pictureSizeContainer}>
          <Text style={styles.pictureQualityLabel}>Picture quality</Text>
          <View style={styles.pictureSizeChooser}>
            <TouchableOpacity onPress={this.previousPictureSize} style={{ padding: 6 }}>
              <Ionicons name="md-arrow-dropleft" size={14} color="white" />
            </TouchableOpacity>
            <View style={styles.pictureSizeLabel}>
              <Text style={{color: 'white'}}>{this.state.pictureSize}</Text>
            </View>
            <TouchableOpacity onPress={this.nextPictureSize} style={{ padding: 6 }}>
              <Ionicons name="md-arrow-dropright" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    );

  renderFriendsOptions = () => {
    if (this.state.friendsSizes.length <= 0){
      return (
      <View style={styles.friendsOptions}>
        <View style={styles.pictureSizeContainer}>
          <Text style={styles.pictureQualityLabel}>No Friends Added!</Text>
        </View>
      </View> 
    );
    }
    else{
    return (
      <View style={styles.friendsOptions}>
        <View style={styles.pictureSizeContainer}>
          <Text style={styles.pictureQualityLabel}>Collaborators</Text>
          <View style={styles.pictureSizeChooser}>
            <TouchableOpacity onPress={this.previousFriends} style={{ padding: 6 }}>
              <Ionicons name="md-arrow-dropleft" size={14} color="white" />
            </TouchableOpacity>
            <View style={styles.pictureSizeLabel}>
              <Text style={{color: 'white'}}>{this.state.friends}</Text>
            </View>
            <TouchableOpacity onPress={this.nextFriends} style={{ padding: 6 }}>
              <Ionicons name="md-arrow-dropright" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View> 
    );
  }
}
  renderCamera = () =>
    (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera}
          onCameraReady={this.collectPictureSizes}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          ratio={this.state.ratio}
          pictureSize={this.state.pictureSize}
          onMountError={this.handleMountError}
          onFacesDetected={this.state.faceDetecting ? this.onFacesDetected : undefined}
          onFaceDetectionError={this.onFaceDetectionError}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.qr,
              BarCodeScanner.Constants.BarCodeType.pdf417,
            ],
          }}
          onBarCodeScanned={this.state.barcodeScanning ? this.onBarCodeScanned : undefined}
          >
          {this.renderTopBar()}
          {this.renderBottomBar()}
        </Camera>
        {this.state.faceDetecting && this.renderFaces()}
        {this.state.faceDetecting && this.renderLandmarks()}
        {this.state.showQualityOptions && this.renderQualityOptions()}
        {this.state.showFriendsOptions && this.renderFriendsOptions()}
      </View>
    );

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
    return <View style={styles.container}>
            <NavigationEvents
              onDidFocus={() => this.paramsFunction()}
            /> 
            {content}
          </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 2,
  },
  bottomBar: {
    paddingBottom: isIPhoneX ? 25 : 5,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flex: 0.12,
    flexDirection: 'row',
  },
  noPermissions: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomButton: {
    flex: 0.3, 
    height: 58, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPhotosDot: {
    position: 'absolute',
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4630EB'
  },
  qualityOptions: {
    position: 'absolute',
    top: 80,
    right: 30,
    width: 200,
    height: 80,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  friendsOptions: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    width: 200,
    height: 80,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3, 
    color: 'white'
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
});
