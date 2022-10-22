from rest_framework.exceptions import ParseError


def validate_args(obj, *args):
    """
    Function for validating that keys are present in a dictionary. obj it the to
    be tested dict, *args are the required keys that must be present.
    Will return nothing on success, and will raise a ParseError on error.
    """
    invalid_args = [key for key in args if key not in obj]

    if len(invalid_args) == 0:
        return
    raise ParseError({"error": "Invalid request", "message": dict(
        zip(invalid_args, ["field is required."]*len(invalid_args)))})
