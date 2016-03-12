#-*-coding: utf-8 -*-
import sys
from PyQt4.QtCore import *
from PyQt4.QtGui import QWidget, QSplitter, QVBoxLayout, QApplication
from kiwoom.core import KiwoomWebViewPlus


class Window(QWidget):
    def __init__(self):
        super().__init__()
        self.view = KiwoomWebViewPlus()
        self.splitter = QSplitter(self)
        self.splitter.setOrientation(Qt.Vertical)
        layout = QVBoxLayout(self)
        layout.setMargin(0)
        layout.addWidget(self.splitter)
        self.splitter.addWidget(self.view)
        self.splitter.addWidget(self.view.webInspector)

        html = """
            <html>
            <head>
            </head>
            <body>
            <div>
                <input type="text" id="entry" value="1"/>
                <input type="button" value="Compute" onclick="updateEntry()"/>
            </div>
            <div>
                <input type="button" value="Quit" onclick="foo.quit()"/>
            </div>
            <script>
            document.addEventListener("kiwoom:connect", function(e) {
              console.log(e.type, e.detail);
              kiwoom.setInputValue("종목코드", "000660");
              console.log(kiwoom.commRqData("Request1", "opt10001", 0, "0101"));
            });
            document.addEventListener("kiwoom:receiveTR", function(e) {
              var data = e.detail;
              console.log(e.type, data);

              console.log(data.rQName, data.trCode);

              console.log(kiwoom.commGetData(data.trCode, "", data.rQName, 0, "종목명"));
              console.log(kiwoom.commGetData(data.trCode, "", data.rQName, 0, "거래량"));
            });
            function updateEntry() {
                setInterval(function() {
                    console.log("test...");
                },1000);
                kiwoom.commConnect();
            }
            </script>

            </body>
            </html>
            """
        self.view.setHtml(html)


def main():
    app = QApplication(sys.argv)
    window = Window()
    window.show()
    app.exec_()

if __name__ == "__main__":
    main()