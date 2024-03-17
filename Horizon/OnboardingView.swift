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

struct LottieView: UIViewRepresentable {
    var name: String
    var loopMode: LottieLoopMode = .loop

    func makeUIView(context: UIViewRepresentableContext<LottieView>) -> UIView {
        let view = UIView(frame: .zero)
        
        // Create a new instance of LottieAnimationView here
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
        // This method can be used to update the animation view if needed
    }
}

// Your existing OnboardingView
struct OnboardingView: View {
    var body: some View {
        VStack {
            // Example of adding a Lottie animation to your OnboardingView
            LottieView(name: "onboarding", loopMode: .loop)
                .frame(width: 300, height: 300) // Adjust the size as needed

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
