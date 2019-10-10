#!/bin/bash
set -e

flask db upgrate
python ./app.py
