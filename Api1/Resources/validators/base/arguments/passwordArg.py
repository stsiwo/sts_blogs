def addPasswordArg(parser):
    parser.add_argument('password', type=str, required=True, help='password is required')
    return parser
