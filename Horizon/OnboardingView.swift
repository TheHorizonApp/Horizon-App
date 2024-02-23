//
//  OnboardingView.swift
//  Horizon
//
//  Created by Joseph Chen on 3/17/24.
//

import Foundation
import SwiftUI

// Your existing OnboardingView
struct OnboardingView: View {
    var body: some View {
        VStack {
            Text("Welcome to Horizon")
            NavigationLink(destination: LoginView()) {
                Text("Get Started")
                    .frame(minWidth: 0, maxWidth: .infinity)
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(40)
            }
            .padding(.horizontal)
        }
    }
}
