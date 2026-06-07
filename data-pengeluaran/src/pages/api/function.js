// src/pages/api/function.js
import { supabase } from '../../db/supabase.js';

// Karena kita memakai mode server murni, matikan pra-render statis
export const prerender = false;

export const POST = async ({ request }) => {
  try {
    // KUNCINYA DI SINI: Baca data dari request.json(), bukan formData lagi!
    const body = await request.json();
    
    const projectId = body.project_id;
    const date = body.date;
    const pic = body.pic;
    const keterangan = body.keterangan;
    const kategori = body.kategori;
    const kredit = body.kredit;

    if (!projectId || !date || !kredit) {
      return new Response(JSON.stringify({ success: false, message: 'Data wajib diisi!' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Masukkan langsung ke Supabase
    const { error: insertError } = await supabase
      .from('pengeluaran')
      .insert([
        {
          project_id: parseInt(projectId.toString()),
          date: date,
          pic: pic,
          keterangan: keterangan,
          kategori: kategori,
          kredit: parseFloat(kredit.toString()),
        },
      ]);

    if (insertError) throw insertError;

    // Berikan respons JSON sukses
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Detail Error di Function:", error.message);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};