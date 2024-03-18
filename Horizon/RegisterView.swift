//
//  RegisterView.swift
//  Horizon
//
//  Created by Joseph Chen on 3/17/24.
//

import Foundation
import SwiftUI

struct RegisterView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username).textFieldStyle(RoundedBorderTextFieldStyle()).padding()
            SecureField("Password", text:$password).textFieldStyle(RoundedBorderTextFieldStyle()).padding()
            SecureField("ConfirmPassword", text: $confirmPassword).textFieldStyle(RoundedBorderTextFieldStyle()).padding()
            Button("Register"){
                
            }
            NavigationLink(destination: LoginView()) {
                Text("Login")
            }
        }
        .padding()
    }
    
}
