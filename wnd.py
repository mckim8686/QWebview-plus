#!/usr/bin/env python
#-*-coding: utf-8 -*-
import sys
import os.path
from PyQt4.QtCore import *
from PyQt4.QtGui import QWidget, QSplitter, QVBoxLayout, QApplication
from plus.kiwoom import KiwoomWebViewPlus

class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.setMinimumSize(1024, 600)
        self.setWindowTitle("QWebview-plus for Kiwoom")

        self.view = KiwoomWebViewPlus()
        self.splitter = QSplitter(self)
        self.splitter.setOrientation(Qt.Horizontal)
        layout = QVBoxLayout(self)
        layout.setMargin(0)
        layout.addWidget(self.splitter)
        self.splitter.addWidget(self.view)
        self.splitter.addWidget(self.view.webInspector)

if __name__ == "__main__":

    if len(sys.argv) < 2:
        entryfle = "index.html" if os.path.isfile("index.html") else ""
    else:
        entryfle = sys.argv[1]

    if entryfle:
        app = QApplication(sys.argv)
        window = Window()
        # window.view.setHtml(open(entryfle, encoding="utf8").read())
        window.view.load(QUrl(entryfle))
        window.show()
        app.exec_()
    else:
        print("진입 페이지를 지정해 주세요")
