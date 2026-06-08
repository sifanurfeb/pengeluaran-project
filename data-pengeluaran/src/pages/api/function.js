// src/pages/api/function.js
import { supabase } from '../../db/supabase.js';

export const prerender = false;

// SINGLE ENDPOINT: Handle POST untuk Project dan Pengeluaran (Create & Update)
export const POST = async ({ request }) => {
  try {
    const body = await request.json();

    // ========================================================
    // DETEKSI 1: JIKA YANG DIKIRIM ADALAH DATA PROYEK
    // ========================================================
    if (body.nama_project !== undefined) {
      const namaProject = body.nama_project;
      const nilaiProject = body.nilai_project;
      const poJasa = body.po_jasa || 0; 

      if (!namaProject || !nilaiProject) {
        return new Response(JSON.stringify({ success: false, message: 'Nama dan Nilai proyek wajib diisi!' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const { error: projectError } = await supabase
        .from('project')
        .insert([{ 
          nama_project: namaProject, 
          nilai_project: parseFloat(nilaiProject.toString()),
          po_jasa: parseFloat(poJasa.toString()) 
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
    const id = body.id; // Ambil ID pengeluaran (jika dikirim untuk edit)
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

    // Struktur payload data pengeluaran
    const dataPayload = {
      project_id: parseInt(projectId.toString()),
      date: date,
      pic: pic,
      kategori: kategori,
      keterangan: keterangan,
      kredit: parseFloat(kredit.toString()),
    };

    if (id) {
      // --- AKSI 2A: UPDATE PENGELUARAN (Jika ada ID) ---
      const { error: updateExpenseError } = await supabase
        .from('pengeluaran')
        .update(dataPayload)
        .eq('id', id); 

      if (updateExpenseError) throw updateExpenseError;

      return new Response(JSON.stringify({ success: true, message: 'Pengeluaran berhasil diperbarui!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else {
      // --- AKSI 2B: INSERT PENGELUARAN BARU (Jika tidak ada ID) ---
      const { error: insertExpenseError } = await supabase
        .from('pengeluaran')
        .insert([dataPayload]);

      if (insertExpenseError) throw insertExpenseError;

      return new Response(JSON.stringify({ success: true, message: 'Pengeluaran berhasil disimpan!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error("Detail Error di Single Function API:", error.message);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// ========================================================
// METHOD PUT (UPDATE) - KHUSUS EDIT DATA PROYEK
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
        po_jasa: parseFloat((po_jasa || 0).toString()) 
      })
      .eq('project_id', project_id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

// ========================================================
// METHOD DELETE - BISA HAPUS PENGELUARAN ATAU PROYEK
// ========================================================
export const DELETE = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Jika parameter body berupa 'id', maka hapus data PENGELUARAN
    if (body.id !== undefined) {
      const { error } = await supabase
        .from('pengeluaran')
        .delete()
        .eq('id', body.id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: 'Pengeluaran berhasil dihapus' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Jika parameter body berupa 'project_id', maka hapus data PROYEK
    if (body.project_id !== undefined) {
      const { error } = await supabase
        .from('project')
        .delete()
        .eq('project_id', body.project_id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: 'Proyek berhasil dihapus' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, message: 'ID tidak valid' }), { status: 400 });

  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};