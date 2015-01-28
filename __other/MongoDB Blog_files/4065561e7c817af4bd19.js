document.write('<link rel="stylesheet" href="https://gist-assets.github.com/assets/embed-b67021dc07195830cc157f7720b938fb.css">')
document.write('<div id=\"gist11950669\" class=\"gist\">\n        <div class=\"gist-file\">\n          <div class=\"gist-data gist-syntax\">\n            \n\n\n\n    <div class=\"file-data\">\n      <table cellpadding=\"0\" cellspacing=\"0\" class=\"lines highlight\">\n        <tr>\n          <td class=\"line-numbers\">\n            <span class=\"line-number\" id=\"file-gistfile1-txt-L1\" rel=\"file-gistfile1-txt-L1\">1<\/span>\n            <span class=\"line-number\" id=\"file-gistfile1-txt-L2\" rel=\"file-gistfile1-txt-L2\">2<\/span>\n            <span class=\"line-number\" id=\"file-gistfile1-txt-L3\" rel=\"file-gistfile1-txt-L3\">3<\/span>\n            <span class=\"line-number\" id=\"file-gistfile1-txt-L4\" rel=\"file-gistfile1-txt-L4\">4<\/span>\n          <\/td>\n          <td class=\"line-data\">\n            <pre class=\"line-pre\"><div class=\"line\" id=\"file-gistfile1-txt-LC1\"> // Fetch the Product document identified by this catalog number\n<\/div><div class=\"line\" id=\"file-gistfile1-txt-LC2\">&gt; product = db.products.findOne({catalog_number: 1234});\n<\/div><div class=\"line\" id=\"file-gistfile1-txt-LC3\">   // Fetch all the Parts that are linked to this Product\n<\/div><div class=\"line\" id=\"file-gistfile1-txt-LC4\">&gt; product_parts = db.parts.find({_id: { $in : product.parts } } ).toArray() ;\n<\/div><\/pre>\n          <\/td>\n        <\/tr>\n      <\/table>\n    <\/div>\n\n          <\/div>\n          <div class=\"gist-meta\">\n            <a href=\"https://gist.github.com/amyberman3/4065561e7c817af4bd19/raw/gistfile1.txt\" style=\"float:right\">view raw<\/a>\n            <a href=\"https://gist.github.com/amyberman3/4065561e7c817af4bd19#file-gistfile1-txt\">gistfile1.txt<\/a>\n            hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n          <\/div>\n        <\/div>\n<\/div>\n')