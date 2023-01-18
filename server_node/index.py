#python get-pip.py
#python -m pip install PyPDF2

from PyPDF2 import PdfWriter, PdfReader

with open("/tmp/input.pdf", "rb") as in_f:
    input1 = PdfReader(in_f)
    output = PdfWriter()

    numPages = len(input1.pages)
    x, y, w, h = (170, 23,255, 350)

    page_x= input1.pages[0].cropbox.left
    page_y= input1.pages[0].cropbox.top 
    upperLeft = [page_x.as_numeric(), page_y.as_numeric()] 
    new_upperLeft  = (upperLeft[0] + x, upperLeft[1] - y)
    new_lowerRight = (new_upperLeft[0] + w, new_upperLeft[1] - h)

    for i in range(numPages):
        page = input1.pages[i]
        page.cropbox.lower_left  = new_upperLeft
        page.cropbox.lower_right = new_lowerRight
        output.add_page(page)

    with open("output.pdf", "wb") as out_f:
        output.write(out_f)