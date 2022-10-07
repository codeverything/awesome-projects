import os
import zipfile

import wget


def base_file_download(path_check, url_download):
    if not os.path.isfile(path_check):
        wget.download(url_download, path_check)


def base_zip_download(path_check, url_download):
    if not os.path.isdir(path_check):
        os.makedirs(path_check)
    if len(os.listdir(path_check)) <= 0:
        zip_path = wget.download(url_download, path_check + ".zip")
        with zipfile.ZipFile(zip_path, "r") as f:
            f.extractall(os.path.dirname(zip_path))


def base_zip_folder_download(path_check, url_download):
    if not os.path.isdir(path_check):
        zip_path = wget.download(url_download, path_check + ".zip")
        with zipfile.ZipFile(zip_path, "r") as f:
            f.extractall(os.path.dirname(zip_path))
