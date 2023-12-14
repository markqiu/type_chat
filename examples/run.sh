#!/bin/bash
npm run build
npm run package
pip install -r requirements.txt --force-reinstall
python chat.py
