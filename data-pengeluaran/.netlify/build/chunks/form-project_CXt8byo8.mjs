import { c as createComponent } from './astro-component_BcjaGyns.mjs';
import 'piccolore';
import { i as renderHead, f as addAttribute, r as renderTemplate } from './ssr-function_Bup3-GJQ.mjs';
import 'clsx';
import { r as renderScript } from './global_Bci_G-wk.mjs';
import { s as supabase } from './supabase_nb3xkvFH.mjs';

const prerender = false;
const $$FormProject = createComponent(async ($$result, $$props, $$slots) => {
  const { data: listProjects } = await supabase.from("project").select("*").order("project_id", { ascending: false });
  const formatRp = (angka) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Kelola Data Proyek</title>${renderHead()}</head> <body class="bg-slate-100 min-h-screen p-4 md:p-8 font-sans text-slate-800"> <div class="max-w-5xl mx-auto"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center justify-between"> <div> <h1 class="text-xl font-black tracking-tight text-slate-900">📁 Master Manajemen Proyek</h1> <p class="text-slate-500 text-xs mt-0.5">Tambah, edit, atau hapus master data proyek perusahaan</p> </div> <a href="/" class="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-xl transition">
📊 Dashboard Utama
</a> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit"> <h2 id="formTitle" class="text-sm font-extrabold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">Tambah Proyek</h2> <form id="projectForm" class="space-y-4"> <input type="hidden" id="project_id" value=""> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nama Proyek *</label> <input type="text" id="nama_project" required placeholder="Contoh: GGP-MAJA" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nilai Project / PO Total (Rp) *</label> <input type="number" id="nilai_project" required placeholder="Contoh: 75000000" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nilai PO Jasa / Tukang (Rp) *</label> <input type="number" id="po_jasa" required placeholder="Contoh: 25000000" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> <p class="text-[10px] text-slate-400 mt-1">Batas plafon anggaran upah tukang / subkon proyek ini</p> </div> <div class="flex gap-2 pt-2"> <button type="submit" id="btnSubmit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
Simpan Proyek
</button> <button type="button" id="btnBatal" class="hidden w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
Batal
</button> </div> </form> </div> <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-2"> <div class="p-4 bg-slate-50 border-b border-slate-100"> <h3 class="font-bold text-xs uppercase tracking-wider text-slate-600">Daftar Master Proyek (${listProjects?.length || 0})</h3> </div> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse text-sm whitespace-nowrap"> <thead> <tr class="bg-slate-100 text-slate-600 text-xs font-bold border-b border-slate-200"> <th class="p-3 pl-4">Nama Proyek</th> <th class="p-3">Nilai PO Total</th> <th class="p-3">Plafon PO Jasa</th> <th class="p-3 text-center">Aksi</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> ${listProjects?.map((p) => renderTemplate`<tr class="hover:bg-slate-50/50"> <td class="p-3 pl-4 font-bold text-slate-900">${p.nama_project}</td> <td class="p-3 font-mono text-xs text-slate-600">${formatRp(p.nilai_project)}</td> <td class="p-3 font-mono text-xs text-purple-600 font-semibold">${formatRp(p.po_jasa || 0)}</td> <td class="p-3 text-center space-x-1"> <button class="btn-edit bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2 py-1 rounded-md font-semibold transition cursor-pointer"${addAttribute(p.project_id, "data-id")}${addAttribute(p.nama_project, "data-nama")}${addAttribute(p.nilai_project, "data-nilai")}${addAttribute(p.po_jasa || 0, "data-jasa")}>
✏️ Edit
</button> <button class="btn-delete bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs px-2 py-1 rounded-md font-semibold transition cursor-pointer"${addAttribute(p.project_id, "data-id")}${addAttribute(p.nama_project, "data-nama")}>
🗑️ Hapus
</button> </td> </tr>`)} </tbody> </table> </div> </div> </div> </div> ${renderScript($$result, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/form-project.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/form-project.astro", void 0);

const $$file = "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/form-project.astro";
const $$url = "/form-project";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FormProject,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
