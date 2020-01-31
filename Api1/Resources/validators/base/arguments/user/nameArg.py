def addNameArg(parser):
    parser.add_argument('name', type=str, required=True, help='name is required')
    return parser
