from Resources.validators.base.uploadImageParser import uploadImageParser


def userImageValidator():
    parser = uploadImageParser('avatorFile')
    args = parser.parse_args(strict=True)
