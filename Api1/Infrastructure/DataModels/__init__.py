from os.path import dirname, basename, isfile, join
import glob
# automatically include this directory's py file
# something is wrong here, does not automatically include
modules = glob.glob(join(dirname(__file__), "*.py"))
__all__ = [basename(f)[:-3] for f in modules if isfile(f) and not f.endswith('__init__.py')]
