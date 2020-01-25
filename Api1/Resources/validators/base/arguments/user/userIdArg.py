def addUserIdArg(parser):
    parser.add_argument('userId', type=str, required=True, help='userId is required')
    return parser
