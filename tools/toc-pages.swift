// Prints the target page (1-based) of every internal link on the first N pages of a PDF,
// column by column, top to bottom, one per line. build.mjs uses it to put page numbers into the contents list.
// Usage: swift toc-pages.swift file.pdf [N]
import Foundation
import PDFKit

let args = CommandLine.arguments
guard args.count >= 2, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
  FileHandle.standardError.write("cannot open PDF\n".data(using: .utf8)!)
  exit(1)
}
let scan = args.count >= 3 ? Int(args[2]) ?? 1 : 1
var rows: [(page: Int, col: Int, y: CGFloat, target: Int)] = []
for i in 0..<min(scan, doc.pageCount) {
  guard let page = doc.page(at: i) else { continue }
  for a in page.annotations {
    var dest = a.destination
    if dest == nil, let goTo = a.action as? PDFActionGoTo { dest = goTo.destination }
    guard let d = dest, let target = d.page else { continue }
    let col = a.bounds.midX < page.bounds(for: .mediaBox).midX ? 0 : 1 // contents list is two columns
    rows.append((i, col, a.bounds.maxY, doc.index(for: target) + 1))
  }
}
rows.sort { ($0.page, $0.col, -$0.y) < ($1.page, $1.col, -$1.y) }
print("pages\t\(doc.pageCount)")
for r in rows { print(r.target) }
