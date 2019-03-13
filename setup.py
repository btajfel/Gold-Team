"""
CamCrew python package configuration.

GoldTeam <gold.team@umich.edu>
"""

from setuptools import setup

setup(
    name='camcrew',
    version='0.1.0',
    packages=['camcrew'],
    include_package_data=True,
    install_requires=[
        'arrow==0.13.0',
        'bs4==0.0.1',
        'Flask==1.0.2',
        'html5validator==0.3.1',
        'pycodestyle==2.4.0',
        'pydocstyle==3.0.0',
        'pylint==2.2.2',
        'pytest==3.8.0',
        'requests==2.21.0',
        'sh==1.12.14',
    ],
)
