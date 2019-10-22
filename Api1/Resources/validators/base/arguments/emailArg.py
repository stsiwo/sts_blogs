def addEmailArg(parser):
    parser.add_argument('email', type=str, required=True, help='email is required')
    return parser
