# contactsApp

Contacts App est une application web de gestion de contacts, combinant un backend Spring Boot et un frontend Angular. Elle permet la gestion des contacts à travers une interface moderne, sécurisée et extensible.
Ce projet est conçu pour être facilement déployé via Docker, Docker Compose, ou Kubernetes, et peut être supervisé avec Grafana.

## Project Structure

---Fonctionnalités principales

      Création, modification et suppression de contacts
      Architecture Spring Boot + Angular
      API REST
      Base de données PostgreSQL (en dev ou en production)
      Gestion des migrations avec Liquibase
      Configuration prête pour CI/CD GitHub Actions

---Architecture du projet

      contacts-app/
      ├── src/
      │ ├── main/
      │ │ ├── java/ (backend Spring Boot)
      │ │ ├── resources/ (config + Liquibase)
      │ │ └── webapp/ (frontend Angular)
      │ └── test/
      ├── target/ (build)
      ├── pom.xml (build Maven)
      └── README.md

## Les commandes

    mvn -B package -Dmaven.test.skip=true --file pom.xml -> Build du JAR
    ------
    docker build -t belcodiallo/contacts-app:${{ github.run_number }} . -> Build image Docker
    ------
    docker/login-action@v3 -> Login au registry (Docker hub)
    ------
    docker push belcodiallo/contacts-app:${{ github.run_number }} -> Push de l’image Docker sur le registry
    ------
    kubectl set image deployment/$DEPLOYMENT_NAME \
            $DEPLOYMENT_NAME=$IMAGE_NAME:${{ github.run_number }} \
            -n $K8S_NAMESPACE
          kubectl rollout status deployment/$DEPLOYMENT_NAME -n $K8S_NAMESPACE -> Deploiement sur kubernetes
    ------
    kubectl get deployment -A -> Voir tous les deploiements

    ------
    kubect  get pods -A -> Voir tous les conteneurs

## Logique du pipeline CI/CD

---Les operations du pipeline

Le pipeline effectue automatiquement les operations suivantes :

        Build du projet Maven
        Build de l’image Docker
        Push vers Docker Hub
        Mise à jour automatique du déploiement Kubernetes
        Rolling update instantané

---Fichier .github/workflows/ci-cd.yml

Resumé du pipeline :

      Checkout du code
      Setup JDK 17
      Compilation Maven -> création du JAR
      Connexion à Docker Hub
      Build de l’image Docker
      Push sur Docker Hub
      Configuration du kubeconfig
      Mise à jour de l’image du déploiement Kubernetes
