# Assignment 0 - Setup

## The Premise

You just bought a new state-of-art laptop and want to set it up so you can get coding. You want to code in Python and found out a good practice is to set up a virtual environment within which you can have your Python version of choice installed along with any number of code libraries installed as needed. Keeping them isolated in a virtual environment prevents them from meddling with native installations in your machine or other setups that might need other versions of Python and accompanying libraries.

## The Task

Do the following:

1. Create a virtual environment on your computer using any method of your choice: [pyenv](https://github.com/pyenv/pyenv), [virtualenv](https://virtualenv.pypa.io/en/latest/index.html), [venv](https://docs.python.org/3/library/venv.html), [conda](https://docs.conda.io/projects/conda/en/latest/index.html), etc.
2. Follow instructions at the aforementioned links specific to your method of choice to activate the virtual environment. If you use an integrated development environment (IDE) such as PyCharm, VS Code, etc., then there should be a way to tell your IDE to use the virtual environment, which is akin to activating it. If you prefer to write code inside a text editor that you invoke from the command line and then run the code from the command line, then you will need to first activate the virtual environment from the command line.
3. Run the supplied `main.py` file, which will then output a `setup_config.txt` file that reports which Python version you have installed, whether it's installed within a virtual environment or not, and the name and the path of the virtual environment. The same report will also print to your terminal.
4. If the aforementioned report says your Python isn't installed within a virtual environment, troubleshoot your setup to ensure the name and the path of your virtual environment is reported.
5. Push your repo to GitHub. Notice that there was no coding necessary, which means the only update to your repo will be the report file.
