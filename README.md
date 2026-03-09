# Facebook Instant Games - Technical Architecture Setup 🕹️

This repository contains a robust technical foundation for developing Facebook Instant Games using **PixiJS v8** and **TypeScript**. The project is designed with scalability and rapid iteration in mind, focusing on clean code and platform abstraction.

## 🚀 Key Features

-   **PixiJS v8 Integration**: Leverages the latest engine features, specifically the new `Assets` management system and modern WebGL/WebGPU rendering.
-   **State Machine Architecture**: Game flow is strictly managed through a Finite State Machine (FSM), separating concerns into `Boot`, `Menu`, and `Play` states.
-   **Mock SDK Layer**: Includes a custom-built `MockSDK` that simulates the Facebook Instant SDK (v7.1). This allows for full development and social feature testing in a local browser environment without needing to deploy to Facebook.
-   **Service-Oriented Design**: All platform-specific interactions are abstracted into a `SocialService`. This architecture ensures the core game logic is platform-agnostic, making future ports (e.g., to Reddit) seamless.
-   **Memory Management**: Implements strict cleanup patterns using `removeFromParent()` and `destroy({ children: true })` to prevent memory leaks in long-running instant game sessions.

## 🛠️ Tech Stack

-   **Language**: TypeScript
-   **Bundler**: Vite
-   **Graphics**: PixiJS v8
-   **Quality Assurance**: SonarLint (Clean Code Standards)

## 📦 Getting Started

1.  **Installation**:
    ```bash
    npm install
    ```

2.  **Local Development**:
    ```bash
    npm run dev
    ```
    *The system will automatically detect the environment; if the Facebook SDK is missing, the Mock SDK will initialize.*

3.  **Build**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

-   `/src/core`: Core State Machine and Base classes.
-   `/src/services`: `SocialService` abstraction and `MockSDK` implementation.
-   `/src/states`: Individual game scenes and logic.
-   `globals.d.ts`: Global Type definitions for external SDKs.

---
**Lead Architect:** Marko Cetini  
**Status:** Core Architecture complete. 
