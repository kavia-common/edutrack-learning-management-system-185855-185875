#!/bin/bash
cd /home/kavia/workspace/code-generation/edutrack-learning-management-system-185855-185875/lms_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

