import pandas as pd
from Random_Forest import rand_forest
from DBSCAN import dbs
from Logistic_Regression import log_reg
from Convert_PE import process_pe_file


def logistic(file_path):
    pe = process_pe_file(file_path)
    log_reg(pe)
    print(pe)

def random_forest(file_path):
    pe = process_pe_file(file_path)
    rand_forest(pe)

def cluster(file_path):
    pe = process_pe_file(file_path)
    dbs(pe)


logistic("/home/zach-slaney/Documents/git/VAA-Very_Awful_Antivirus/VSCodeUserSetup-x64-1.105.1.exe")