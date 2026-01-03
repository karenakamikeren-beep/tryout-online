import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST() {
  try {
    // Check if data already exists
    const existingTryouts = await db.tryout.count()
    if (existingTryouts > 0) {
      return NextResponse.json(
        { message: 'Data already seeded' },
        { status: 200 }
      )
    }

    // Create sample tryouts
    const tryout1 = await db.tryout.create({
      data: {
        title: 'Matematika Dasar',
        description: 'Tes kemampuan matematika dasar mencakup aritmatika, aljabar, dan geometri.',
        duration: 30,
        passingScore: 70,
        isActive: true,
        questions: {
          create: [
            {
              questionText: 'Berapa hasil dari 15 + 27?',
              optionA: '42',
              optionB: '41',
              optionC: '43',
              optionD: '40',
              correctAnswer: 'A',
            },
            {
              questionText: 'Jika x = 5 dan y = 3, berapa nilai dari 2x + y?',
              optionA: '12',
              optionB: '13',
              optionC: '14',
              optionD: '11',
              correctAnswer: 'B',
            },
            {
              questionText: 'Berapa luas persegi dengan sisi 8 cm?',
              optionA: '64 cm²',
              optionB: '32 cm²',
              optionC: '16 cm²',
              optionD: '48 cm²',
              correctAnswer: 'A',
            },
            {
              questionText: 'Berapa hasil dari 144 ÷ 12?',
              optionA: '11',
              optionB: '13',
              optionC: '12',
              optionD: '14',
              correctAnswer: 'C',
            },
            {
              questionText: 'Manakah yang merupakan bilangan prima?',
              optionA: '15',
              optionB: '17',
              optionC: '21',
              optionD: '25',
              correctAnswer: 'B',
            },
          ],
        },
      },
    })

    const tryout2 = await db.tryout.create({
      data: {
        title: 'Bahasa Indonesia',
        description: 'Tes kemampuan bahasa Indonesia mencakup tata bahasa, pemahaman bacaan, dan kosakata.',
        duration: 25,
        passingScore: 70,
        isActive: true,
        questions: {
          create: [
            {
              questionText: 'Manakah kata yang menggunakan ejaan yang benar?',
              optionA: 'Apotik',
              optionB: 'Apotek',
              optionC: 'Apotiq',
              optionD: 'Apatek',
              correctAnswer: 'B',
            },
            {
              questionText: 'Sinonim dari kata "cerdas" adalah...',
              optionA: 'Bodoh',
              optionB: 'Pintar',
              optionC: 'Malas',
              optionD: 'Lemah',
              correctAnswer: 'B',
            },
            {
              questionText: 'Antonim dari kata "panjang" adalah...',
              optionA: 'Lebar',
              optionB: 'Tinggi',
              optionC: 'Pendek',
              optionD: 'Besar',
              correctAnswer: 'C',
            },
            {
              questionText: '"Hari ini cuaca sangat cerah." Kalimat tersebut termasuk jenis kalimat...',
              optionA: 'Tanya',
              optionB: 'Perintah',
              optionC: 'News',
              optionD: 'Seru',
              correctAnswer: 'C',
            },
            {
              questionText: 'Kata depan yang tepat untuk melengkapi kalimat "Buku itu ada ___ meja." adalah...',
              optionA: 'di',
              optionB: 'ke',
              optionC: 'dari',
              optionD: 'pada',
              correctAnswer: 'A',
            },
          ],
        },
      },
    })

    const tryout3 = await db.tryout.create({
      data: {
        title: 'Pengetahuan Umum',
        description: 'Tes pengetahuan umum mencakup sejarah, geografi, sains, dan budaya.',
        duration: 35,
        passingScore: 70,
        isActive: true,
        questions: {
          create: [
            {
              questionText: 'Ibukota negara Indonesia adalah...',
              optionA: 'Surabaya',
              optionB: 'Medan',
              optionC: 'Jakarta',
              optionD: 'Bandung',
              correctAnswer: 'C',
            },
            {
              questionText: 'Planet terdekat dari matahari adalah...',
              optionA: 'Venus',
              optionB: 'Merkurius',
              optionC: 'Mars',
              optionD: 'Bumi',
              correctAnswer: 'B',
            },
            {
              questionText: 'Indonesia merdeka pada tahun...',
              optionA: '1942',
              optionB: '1945',
              optionC: '1950',
              optionD: '1948',
              correctAnswer: 'B',
            },
            {
              questionText: 'Lambang kimia untuk air adalah...',
              optionA: 'CO2',
              optionB: 'H2O',
              optionC: 'O2',
              optionD: 'NaCl',
              correctAnswer: 'B',
            },
            {
              questionText: 'Gunung tertinggi di Indonesia adalah...',
              optionA: 'Gunung Rinjani',
              optionB: 'Gunung Semeru',
              optionC: 'Puncak Jaya',
              optionD: 'Gunung Kerinci',
              correctAnswer: 'C',
            },
          ],
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Database seeded successfully',
        data: {
          tryoutsCreated: 3,
          questionsCreated: 15,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}
