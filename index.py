#python get-pip.py
#python -m pip install PyPDF2

from PyPDF2 import PdfFileWriter, PdfFileReader

with open("/tmp/input.pdf", "rb") as in_f:
    input1 = PdfFileReader(in_f)
    output = PdfFileWriter()

    numPages = input1.getNumPages()
    x, y, w, h = (170, 23,255, 350)

    page_x, page_y = input1.getPage(0).cropBox.getUpperLeft()
    upperLeft = [page_x.as_numeric(), page_y.as_numeric()] 
    new_upperLeft  = (upperLeft[0] + x, upperLeft[1] - y)
    new_lowerRight = (new_upperLeft[0] + w, new_upperLeft[1] - h)

    for i in range(numPages):
        page = input1.getPage(i)
        page.cropBox.upperLeft  = new_upperLeft
        page.cropBox.lowerRight = new_lowerRight
        output.addPage(page)

    with open("output.pdf", "wb") as out_f:
        output.write(out_f)