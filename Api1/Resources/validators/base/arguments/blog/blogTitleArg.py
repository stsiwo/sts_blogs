def addBlogTitleArg(parser):
    parser.add_argument('title', type=str, required=True, help='title is required')
    return parser
