#!/bin/bash -ex
# Output user data logs into a separate file for debugging
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Download the latest NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Source NVM scripts
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install the latest Node.js version using NVM
nvm install node

# Upgrade YUM packages
sudo yum upgrade -y

# Install Git
sudo yum install git -y

# Setup SSH for Git
mkdir -p ~/.ssh
chmod 700 ~/.ssh
# Ensure your private key is stored securely at /path/to/private_key
cp /path/to/private_key ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa

# Clone the private repository
git clone git@github.com:bhavikakarale/server.git

# Navigate to the project directory
cd server

# Change permissions
sudo chmod -R 755 .

# Install Node.js modules
npm install

# Start the application
node app.js > app.out.log 2> app.err.log < /dev/null &