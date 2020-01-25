def addBlogSubtitleArg(parser):
    parser.add_argument('subtitle', type=str, required=True, help='subtitle is required')
    return parser
