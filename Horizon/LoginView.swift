//
//  LoginView.swift
//  Horizon
//
//  Created by Joseph Chen on 3/17/24.
//

import Foundation
import SwiftUI

struct LoginView: View {
    @State private var username = ""
    @State private var password = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username).textFieldStyle(RoundedBorderTextFieldStyle()).padding()
            SecureField("Password", text: $password).textFieldStyle(RoundedBorderTextFieldStyle()).padding()
            Button("Login"){
                
            }
            NavigationLink(destination: RegisterView()) {
                Text("Register")
            }
        }
        .padding()
    }
    
    
    
}

