//
//  Chatt.swift
//  Chatter
//
//  Created by Tiberiu Vilcu on 8/30/17.
//  Copyright © 2017 tiberiuvilcu. All rights reserved.
//

import Foundation
import UIKit

class Chatt {
    var message: String
    var username: String
    var timestamp: String
    
    init(username: String, message: String, timestamp: String) {
        self.username = username
        self.message = message
        self.timestamp = timestamp
    }
}
