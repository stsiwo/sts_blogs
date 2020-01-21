def addBlogIdArg(parser):
    parser.add_argument('blogId', type=str, required=True, help='blogId is required')
    return parser
