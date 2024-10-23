import * as xlsx from "xlsx";

export async function POST(req) {
  try {
    const { data } = await req.json(); // Get the scanned data from the request body

    // Create a new workbook and worksheet
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet([{ data }]);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the Excel file in memory
    const excelBuffer = xlsx.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Set headers to download the file
    return new Response(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=data.xlsx",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error saving data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
