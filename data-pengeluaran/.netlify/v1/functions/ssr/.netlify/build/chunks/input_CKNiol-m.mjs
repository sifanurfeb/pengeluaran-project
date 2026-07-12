import { c as createComponent } from './astro-component_BcjaGyns.mjs';
import 'piccolore';
import { i as renderHead, f as addAttribute, r as renderTemplate } from './ssr-function_Bup3-GJQ.mjs';
import 'clsx';
import { r as renderScript } from './global_Bci_G-wk.mjs';
import { s as supabase } from './supabase_nb3xkvFH.mjs';

const prerender = false;
const $$Input = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Input;
  const { data: projects } = await supabase.from("project").select("project_id, nama_project").order("nama_project", { ascending: true });
  const url = new URL(Astro2.request.url);
  const editId = url.searchParams.get("id");
  let dataLama = null;
  let isEdit = false;
  if (editId && editId !== "undefined") {
    isEdit = true;
    const targetId = parseInt(editId);
    const { data, error } = await supabase.from("pengeluaran").select("*").eq("expense_id", targetId).maybeSingle();
    if (!error && data) {
      dataLama = data;
    } else if (error) {
      console.error("Gagal mengambil data lama:", error.message);
    }
  }
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${isEdit ? "Edit Pengeluaran" : "Input Pengeluaran"}</title>${renderHead()}</head> <body class="bg-slate-100 min-h-screen flex flex-col items-center justify-center p-6 font-sans"> <div class="bg-white p-8 rounded-2xl shadow-md border border-slate-200 w-full max-w-md mx-auto"> <h2 class="text-2xl font-black text-slate-900 mb-6 text-center tracking-tight"> ${isEdit ? "✏️ Edit Pengeluaran Project" : "📝 Input Pengeluaran Project"} </h2> <form id="expenseForm" class="space-y-4"> <input type="hidden" id="edit_id"${addAttribute(editId || "", "value")}> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Pilih Proyek *</label> <select id="project_id" required class="w-full p-2.5 border border-gray-300 rounded-lg bg-white"> <option value="">-- Pilih Proyek --</option> ${projects?.map((project) => renderTemplate`<option${addAttribute(project.project_id, "value")}${addAttribute(dataLama?.project_id?.toString() === project.project_id?.toString(), "selected")}> ${project.nama_project} </option>`)} </select> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori Pengeluaran *</label> <select id="kategori" required class="w-full p-2.5 border border-gray-300 rounded-lg bg-white"> <option value="">-- Pilih Kategori --</option> <option value="material"${addAttribute(dataLama?.kategori === "material", "selected")}>📦 Material / Logistik</option> <option value="jasa"${addAttribute(dataLama?.kategori === "jasa", "selected")}>🛠️ Jasa / Tukang / Subkon</option> </select> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Tanggal *</label> <input type="date" id="date" required${addAttribute(dataLama?.date || "", "value")} class="w-full p-2.5 border border-gray-300 rounded-lg"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">PIC (Nama)</label> <input type="text" id="pic"${addAttribute(dataLama?.pic || "", "value")} placeholder="Contoh: Ujang" class="w-full p-2.5 border border-gray-300 rounded-lg"> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Keterangan / Keperluan</label> <textarea id="keterangan" placeholder="Contoh: Pembelian Semen" rows="3" class="w-full p-2.5 border border-gray-300 rounded-lg">${dataLama?.keterangan || ""}</textarea> </div> <div> <label class="block text-sm font-semibold text-gray-700 mb-1">Jumlah Uang / Kredit (Rp) *</label> <input type="number" id="kredit" required min="0"${addAttribute(dataLama?.kredit || "", "value")} placeholder="Contoh: 1500000" class="w-full p-2.5 border border-gray-300 rounded-lg"> </div> <button type="submit" id="btnSubmit"${addAttribute(`w-full text-white font-bold p-3 rounded-lg transition mt-4 ${isEdit ? "bg-amber-500 hover:bg-amber-600" : "bg-blue-600 hover:bg-blue-700"}`, "class")}> ${isEdit ? "🔄 Update Pengeluaran" : "💾 Simpan Pengeluaran"} </button> </form> </div> <div class="mt-6"> <a href="/" class="text-sm font-bold text-slate-500 hover:underline">
⬅️ Kembali ke Dashboard
</a> </div> ${renderScript($$result, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/input.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/input.astro", void 0);

const $$file = "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/input.astro";
const $$url = "/input";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Input,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
