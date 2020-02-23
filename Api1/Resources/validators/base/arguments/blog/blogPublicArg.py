def addBlogPublicArg(parser):
    parser.add_argument('public', type=str, required=True, help='public is required')
    return parser
