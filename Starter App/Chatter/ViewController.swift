//
//  ViewController.swift
//  Chatter
//
//  Created by Tiberiu Vilcu on 8/30/17.
//  Copyright © 2017 tiberiuvilcu. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

class ChattTableViewController: UITableViewController {
    
    var chatts = [Chatt]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        self.refreshControl?.addTarget(self, action: #selector(ChattTableViewController.handleRefresh(_:)), for: UIControlEvents.valueChanged)
        self.refreshChatts()
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @objc func handleRefresh(_ refreshControl: UIRefreshControl) {
        self.refreshChatts()
    }
    
    func refreshChatts() {
        let requestURL = "http://159.89.181.188/getchatts/"
        var request = URLRequest(url: URL(string: requestURL)!)
        request.httpMethod = "GET"
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let _ = data, error == nil else {
                print("NETWORKING ERROR")
                self.refreshControl?.endRefreshing()
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                print("HTTP STATUS: \(httpStatus.statusCode)")
                self.refreshControl?.endRefreshing()
                return
            }
            
            do {
                var newChatts = [Chatt]()
                let json = try JSONSerialization.jsonObject(with: data!) as! [String:Any]
                let chattsReceived = json["chatts"] as? [[String]] ?? []
                for element in chattsReceived {
                    let chatt = Chatt(username: element[0], message: element[1], timestamp: element[2])
                    newChatts += [chatt]
                }
                self.chatts = newChatts
                self.tableView.estimatedRowHeight = 140
                self.tableView.rowHeight = UITableViewAutomaticDimension
                self.tableView.reloadData()
                self.refreshControl?.endRefreshing()
            }
            catch let error as NSError {
                print(error)
            }
        }
        task.resume()
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath as IndexPath, animated: true)
    }
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return chatts.count
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cellIdentifier = "ChattTableCell"
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ChattTableCell else {
            fatalError("The dequeued cell is not an instance of ChattTableCell")
        }

        let chatt = chatts[indexPath.row]
        cell.usernameLabel.text = chatt.username
        cell.usernameLabel.sizeToFit()
        cell.messageLabel.text = chatt.message
        cell.messageLabel.numberOfLines = 0;
        cell.messageLabel.sizeToFit()
        cell.timestampLabel.text = chatt.timestamp
        cell.timestampLabel.sizeToFit()
        return cell
    }
}

class ComposeViewController: UIViewController {
    
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var messageTextView: UITextView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func submitClicked(_ sender: UIBarButtonItem) {
        let json: [String: Any] = ["username": self.usernameLabel.text ?? "NULL",
                                   "message": self.messageTextView.text ?? "I wrote a blank message, oops!"]
        let jsonData = try? JSONSerialization.data(withJSONObject: json)
        
        var request = URLRequest(url: URL(string: "http://159.89.181.188/addchatt/")!)
        request.httpMethod = "POST"
        request.httpBody = jsonData
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let _ = data, error == nil else {
                print("NETWORKING ERROR")
                return
            }
            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                print("HTTP STATUS: \(httpStatus.statusCode)")
                return
            }
        }
        task.resume()
        
        dismiss(animated: true, completion: nil)
    }
    
}
