// src/pages/api/function.js
import { supabase } from '../../db/supabase.js';

export const prerender = false;

// SINGLE ENDPOINT: Handle POST untuk Project dan Pengeluaran
export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    // ========================================================
    // DETEKSI 1: JIKA YANG DIKIRIM ADALAH DATA PROYEK
    // ========================================================
    if (body.nama_project !== undefined) {
      const namaProject = body.nama_project;
      const nilaiProject = body.nilai_project;
      const poJasa = body.po_jasa || 0; // Ambil po_jasa dari form, default 0 jika kosong

      if (!namaProject || !nilaiProject) {
        return new Response(JSON.stringify({ success: false, message: 'Nama dan Nilai proyek wajib diisi!' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Pastikan kolom po_jasa ikut di-insert ke tabel project
      const { error: projectError } = await supabase
        .from('project')
        .insert([{ 
          nama_project: namaProject, 
          nilai_project: parseFloat(nilaiProject.toString()),
          po_jasa: parseFloat(poJasa.toString()) // Menyimpan nilai PO Jasa
        }]);

      if (projectError) throw projectError;

      return new Response(JSON.stringify({ success: true, message: 'Proyek berhasil disimpan!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // ========================================================
    // DETEKSI 2: JIKA YANG DIKIRIM ADALAH DATA PENGELUARAN
    // ========================================================
    const projectId = body.project_id;
    const date = body.date;
    const pic = body.pic;
    const kategori = body.kategori;
    const keterangan = body.keterangan;
    const kredit = body.kredit;

    if (!projectId || !date || !kredit || !kategori) {
      return new Response(JSON.stringify({ success: false, message: 'Data pengeluaran belum lengkap!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { error: expenseError } = await supabase
      .from('pengeluaran')
      .insert([
        {
          project_id: parseInt(projectId.toString()),
          date: date,
          pic: pic,
          kategori: kategori,
          keterangan: keterangan,
          kredit: parseFloat(kredit.toString()),
        },
      ]);

    if (expenseError) throw expenseError;

    return new Response(JSON.stringify({ success: true, message: 'Pengeluaran berhasil disimpan!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Detail Error di Single Function API:", error.message);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// ========================================================
// METHOD PUT (UPDATE) - IKUT SERTAKAN PO JASA UNTUK EDIT PROYEK
// ========================================================
export const PUT = async ({ request }) => {
  try {
    const body = await request.json();
    const { project_id, nama_project, nilai_project, po_jasa } = body;

    const { error } = await supabase
      .from('project')
      .update({ 
        nama_project: nama_project, 
        nilai_project: parseFloat(nilai_project.toString()),
        po_jasa: parseFloat((po_jasa || 0).toString()) // Perbarui nilai PO Jasa saat edit
      })
      .eq('project_id', project_id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// ========================================================
// METHOD DELETE
// ========================================================
export const DELETE = async ({ request }) => {
  try {
    const body = await request.json();
    const { project_id } = body;

    const { error } = await supabase.from('project').delete().eq('project_id', project_id);
    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};