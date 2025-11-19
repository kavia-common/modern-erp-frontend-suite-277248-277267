#!/bin/bash
cd /home/kavia/workspace/code-generation/modern-erp-frontend-suite-277248-277267/erp_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

