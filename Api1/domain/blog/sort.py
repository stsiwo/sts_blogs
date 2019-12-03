from typing import Dict
from sqlalchemy import asc, desc


SortMap: Dict = {
        '0': {  # default
            "attr": "createdDate",
            "order": asc
            },
        '1': {
            "attr": "createdDate",
            "order": desc
            },
        '2': {
            "attr": "title",
            "order": asc
            },
        '3': {
            "attr": "title",
            "order": desc
            },
        '4': {
            "attr": "clap",
            "order": asc
            },
        '5': {
            "attr": "clap",
            "order": desc
            },
        }



