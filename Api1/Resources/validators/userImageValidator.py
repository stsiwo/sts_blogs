from Resources.validators.base.uploadImageParser import uploadImageParser


def userImageValidator():
    parser = uploadImageParser('avatarFile')
    args = parser.parse_args(strict=True)
