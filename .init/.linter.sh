#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-3502-4e6cec93/notes_app_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

