//
//  OnboardingView.swift
//  Horizon
//
//  Created by Joseph Chen on 3/17/24.
//

import Foundation
import SwiftUI
import Lottie
import UIKit
import AuthenticationServices

struct SignInWithAppleButtonWrapper: UIViewRepresentable {
    var colorScheme: ColorScheme
    
    func makeUIView(context: Context) -> ASAuthorizationAppleIDButton {
        let style: ASAuthorizationAppleIDButton.Style = colorScheme == .dark ? .white : .black
        return ASAuthorizationAppleIDButton(authorizationButtonType: .continue, authorizationButtonStyle: style)
    }
    
    func updateUIView(_ uiView: ASAuthorizationAppleIDButton, context: Context) {
    }
}


struct LottieView: UIViewRepresentable {
    var name: String
    var loopMode: LottieLoopMode = .loop

    func makeUIView(context: UIViewRepresentableContext<LottieView>) -> UIView {
        let view = UIView(frame: .zero)
        
        let animationView = LottieAnimationView()
        let animation = LottieAnimation.named(name)
        animationView.animation = animation
        animationView.contentMode = .scaleAspectFit
        animationView.loopMode = loopMode
        animationView.play()
        
        animationView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(animationView)
        
        NSLayoutConstraint.activate([
            animationView.heightAnchor.constraint(equalTo: view.heightAnchor),
            animationView.widthAnchor.constraint(equalTo: view.widthAnchor)
        ])
        
        return view
    }

    func updateUIView(_ uiView: UIView, context: UIViewRepresentableContext<LottieView>) {
    }
}
struct OnboardingView: View {
    @Environment(\.colorScheme) var colorScheme
    
    var body: some View {
        VStack {
            LottieView(name: "onboarding", loopMode: .loop)
                .frame(width: 400, height: 400)

            Text("Stay Organized")
                .fontWeight(.thin)
                .multilineTextAlignment(.center).font(.system(size: 32))
            
            Text("with Horizon.")
                .fontWeight(.bold)
                .multilineTextAlignment(.center).font(.system(size: 36))
                .padding(.bottom, 30)
            
            Button(action: {
                // Action for creating an account
            }) {
                Text("Create an Account")
                    .frame(minWidth: 0, maxWidth: .infinity)
                    .padding()
                    .foregroundColor(colorScheme == .dark ? .black : .white)
                    .background(colorScheme == .dark ? .white : .black)
                    .cornerRadius(10)
                    .fontWeight(.medium)
            }
            .padding(.horizontal)
            
            SignInWithAppleButtonWrapper(colorScheme: colorScheme)
                .frame(height: 44)
                .padding(.horizontal)
                .cornerRadius(10)
                .padding(.top, 5)
            
            NavigationLink(destination: LoginView()) {
                Text("Already have an account? Login here.")
                    .foregroundColor(colorScheme == .dark ? .white : .black).font(.system(size: 12))
            }
            .padding(.top, 5)
        }
        .padding()
    }
}
