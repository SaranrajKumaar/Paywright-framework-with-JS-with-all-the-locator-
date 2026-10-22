
pipeline {
    agent any

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Choose the browser'
        )
        choice(
            name: 'EXECUTION_MODE',
            choices: ['headed', 'headless'],
            description: 'Choose execution mode'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/SaranrajKumaar/Playwright-End-to-End-framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def mode = params.EXECUTION_MODE == 'headed'
                        ? '--headed'
                        : ''

                    bat "npx playwright test --project=${params.BROWSER} ${mode}"
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}
