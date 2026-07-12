import { c as createComponent } from './astro-component_BcjaGyns.mjs';
import 'piccolore';
import { i as renderHead, f as addAttribute, r as renderTemplate, j as renderComponent, k as Fragment } from './ssr-function_Bup3-GJQ.mjs';
import { r as renderScript } from './global_Bci_G-wk.mjs';
import { s as supabase } from './supabase_nb3xkvFH.mjs';

const prerender = false;
const $$Invoice = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Invoice;
  const { data: allProjects } = await supabase.from("project").select("project_id, nama_project").order("nama_project", { ascending: true });
  const url = new URL(Astro2.request.url);
  const selectedProjectId = url.searchParams.get("project_id");
  let projectInfo = null;
  let invoices = [];
  let totalInvoiceDenganPPN = 0;
  let totalInvoiceTanpaPPN = 0;
  const PPN_RATE = 1.11;
  if (selectedProjectId) {
    const { data: pData } = await supabase.from("project").select("*").eq("project_id", selectedProjectId).single();
    projectInfo = pData;
    const { data: iData } = await supabase.from("invoice").select("*").eq("project_id", selectedProjectId).order("tgl_inv", { ascending: true });
    invoices = iData || [];
    totalInvoiceDenganPPN = invoices.reduce((acc, curr) => acc + (curr.nilai_inv || 0), 0);
    totalInvoiceTanpaPPN = totalInvoiceDenganPPN / PPN_RATE;
  }
  const formatRp = (angka) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(angka);
  const formatTanggalSingkat = (tanggalString) => {
    if (!tanggalString) return "-";
    const date = new Date(tanggalString);
    const hari = date.getDate();
    const bulanSingkat = date.toLocaleDateString("id-ID", { month: "short" });
    return `${hari} ${bulanSingkat}`;
  };
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Kelola Invoice Project</title>${renderHead()}</head> <body class="bg-slate-100 min-h-screen p-4 md:p-8 font-sans text-slate-800"> <div class="max-w-6xl mx-auto"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"> <div> <h1 class="text-xl font-black tracking-tight text-slate-900">🧾 Kelola Invoice Project</h1> <p class="text-slate-500 text-xs mt-0.5">Catat invoice yang sudah masuk (termin) untuk tiap project</p> </div> <div class="flex items-center gap-3"> <form method="GET" class="flex items-center"> <select name="project_id" onchange="this.form.submit()" class="bg-slate-50 border border-slate-300 text-slate-700 py-2 px-4 pr-8 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer font-medium text-sm transition"> <option value="">-- Pilih Proyek --</option> ${allProjects?.map((p) => renderTemplate`<option${addAttribute(p.project_id, "value")}${addAttribute(selectedProjectId == p.project_id, "selected")}> ${p.nama_project} </option>`)} </select> </form> <a href="/" class="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-2 rounded-xl transition">
📊 Dashboard Utama
</a> </div> </div> ${selectedProjectId ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"> <div class="bg-white p-5 rounded-2xl shadow-xs border border-slate-200"> <div class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Nilai Project (PO)</div> <div class="text-lg font-black text-slate-900 font-mono tracking-tight">${formatRp(projectInfo?.nilai_project || 0)}</div> </div> <div class="bg-blue-50 border border-blue-200 p-5 rounded-2xl shadow-xs"> <div class="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2">Total Invoice (+PPN)</div> <div class="text-lg font-black text-blue-700 font-mono tracking-tight">${formatRp(totalInvoiceDenganPPN)}</div> </div> <div class="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-xs"> <div class="text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">Total Invoice (Tanpa PPN)</div> <div class="text-lg font-black text-emerald-700 font-mono tracking-tight">${formatRp(totalInvoiceTanpaPPN)}</div> </div> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit"> <h2 id="formTitle" class="text-sm font-extrabold uppercase tracking-wider text-slate-700 border-b border-slate-100 pb-2 mb-4">Tambah Invoice</h2> <form id="invoiceForm" class="space-y-4"> <input type="hidden" id="inv_id" value=""> <input type="hidden" id="project_id"${addAttribute(selectedProjectId, "value")}> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nomor Invoice</label> <input type="text" id="no_inv" placeholder="Contoh: INV/001/2026" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Keterangan</label> <input type="text" id="ket" placeholder="Contoh: Termin 1 / DP 30%" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Tanggal Invoice *</label> <input type="date" id="tgl_inv" required class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nilai Invoice — Termasuk PPN (Rp) *</label> <input type="number" id="nilai_inv" required placeholder="Contoh: 22200000" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> <p class="text-[10px] text-slate-400 mt-1">Sistem otomatis hitung nilai tanpa PPN (÷1.11) untuk margin</p> </div> <div> <label class="block text-xs font-bold text-slate-600 mb-1">Nilai Sudah Dibayar — Termasuk PPN (Rp)</label> <input type="number" id="dibayar" placeholder="Contoh: 15000000" class="w-full p-2.5 border border-slate-300 rounded-xl outline-none text-sm focus:border-blue-500"> <p class="text-[10px] text-slate-400 mt-1">Kosongkan/isi 0 jika belum ada pembayaran masuk untuk invoice ini</p> </div> <div class="flex gap-2 pt-2"> <button type="submit" id="btnSubmit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
Simpan Invoice
</button> <button type="button" id="btnBatal" class="hidden w-1/3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer">
Batal
</button> </div> </form> </div> <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-2"> <div class="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between"> <h3 class="font-bold text-xs uppercase tracking-wider text-slate-600">Daftar Invoice: ${projectInfo?.nama_project}</h3> <span class="inline-flex bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full font-bold">${invoices.length} Invoice</span> </div> <div class="overflow-x-auto"> <table class="w-full text-left border-collapse text-sm whitespace-nowrap"> <thead> <tr class="bg-slate-100 text-slate-600 text-xs font-bold border-b border-slate-200"> <th class="p-3 pl-4">Tanggal</th> <th class="p-3">No. Invoice</th> <th class="p-3">Keterangan</th> <th class="p-3 text-right">Nilai (+PPN)</th> <th class="p-3 text-right">Sudah Dibayar (+PPN)</th> <th class="p-3 text-right">Nilai (Tanpa PPN)</th> <th class="p-3 text-center">Aksi</th> </tr> </thead> <tbody class="divide-y divide-slate-100"> ${invoices.map((inv) => renderTemplate`<tr class="hover:bg-slate-50/50"> <td class="p-3 pl-4 text-xs text-slate-500 font-mono">${formatTanggalSingkat(inv.tgl_inv)}</td> <td class="p-3 font-semibold text-slate-800">${inv.no_inv || "-"}</td> <td class="p-3 text-xs text-slate-600">${inv.ket || "-"}</td> <td class="p-3 text-right font-mono text-slate-500">${formatRp(inv.nilai_inv)}</td> <td class="p-3 text-right font-mono font-bold text-blue-700">${formatRp(inv.dibayar || 0)}</td> <td class="p-3 text-right font-mono text-emerald-700">${formatRp((inv.nilai_inv || 0) / PPN_RATE)}</td> <td class="p-3 text-center space-x-1"> <button class="btn-edit bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs px-2 py-1 rounded-md font-semibold transition cursor-pointer"${addAttribute(inv.inv_id, "data-id")}${addAttribute(inv.no_inv || "", "data-nomor")}${addAttribute(inv.ket || "", "data-keterangan")}${addAttribute(inv.tgl_inv, "data-tanggal")}${addAttribute(inv.nilai_inv, "data-nilai")}${addAttribute(inv.dibayar || 0, "data-dibayar")}>
✏️ Edit
</button> <button class="btn-delete bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs px-2 py-1 rounded-md font-semibold transition cursor-pointer"${addAttribute(inv.inv_id, "data-id")}${addAttribute(inv.no_inv || "", "data-nomor")}>
🗑️ Hapus
</button> </td> </tr>`)} </tbody> </table> ${invoices.length === 0 && renderTemplate`<div class="py-16 text-center text-slate-400"> <div class="text-4xl mb-2">🧾</div> <p class="text-sm font-medium">Belum ada invoice untuk project ini.</p> </div>`} </div> </div> </div> ` })}` : renderTemplate`<div class="bg-white py-24 px-6 rounded-3xl border-2 border-dashed border-slate-200 text-center max-w-xl mx-auto mt-12 shadow-xs"> <div class="w-16 h-16 bg-blue-50 text-blue-600 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-4 font-bold shadow-inner">
🧾
</div> <h2 class="text-xl font-extrabold text-slate-800 tracking-tight">Belum Ada Proyek Dipilih</h2> <p class="text-slate-400 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
Silakan gunakan menu dropdown di atas untuk memilih proyek dan mengelola invoice-nya.
</p> </div>`} </div> ${renderScript($$result, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/invoice.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/invoice.astro", void 0);

const $$file = "/workspaces/pengeluaran-project/data-pengeluaran/src/pages/invoice.astro";
const $$url = "/invoice";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Invoice,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
