import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { randomInt } from 'crypto'

export async function POST(request: Request) {
  try {
    const { users = 50000, tryouts = 250, questionsPerTryout = 20, results = 500 } = await request.json()

    console.log(`[GENERATE DUMMY DATA] Starting...
      Users: ${users}, Tryouts: ${tryouts}, Questions/Tryout: ${questionsPerTryout}, Results: ${results}`)

    // 1. Generate Dummy Users
    const dummyUsers = []
    for (let i = 0; i < users; i++) {
      dummyUsers.push({
        id: `user-${i}`,
        email: `user${i}@tryoutonline.com`,
        name: `User ${i}`,
        role: 'user',
        createdAt: new Date(Date.now() - randomInt(0, 86400000 * 30)), // Random 0-30 hari yang lalu
        updatedAt: new Date(),
      })
    }

    await db.user.createMany({
      data: dummyUsers,
      skipDuplicates: true,
    })

    console.log('[GENERATE DUMMY DATA] Users created:', dummyUsers.length)

    // 2. Generate Dummy Categories (if not exists)
    const categories = [
      { name: 'CPNS', slug: 'cpns', icon: 'Award', color: '#f97316' },
      { name: 'UTBK', slug: 'utbk', icon: 'BookOpen', color: '#10b981' },
      { name: 'SMA', slug: 'sma', icon: 'GraduationCap', color: '#059669' },
      { name: 'SMP', slug: 'smp', icon: 'Library', color: '#8b5cf6' },
      { name: 'SD', slug: 'sd', icon: 'School', color: '#d97706' },
    ]

    await db.category.createMany({
      data: categories,
      skipDuplicates: true,
    })

    const dbCategories = await db.category.findMany()
    console.log('[GENERATE DUMMY DATA] Categories created:', dbCategories.length)

    // 3. Generate Dummy Tryouts
    const dummyTryouts = []
    for (let i = 0; i < tryouts; i++) {
      const category = dbCategories[i % dbCategories.length]
      const categorySlug = ['cpns', 'utbk', 'sma', 'smp', 'sd'][i % 5]
      dummyTryouts.push({
        title: `${category.name} Tryout ${i + 1}`,
        description: `Latihan soal ${category.name} untuk persiapan ujian`,
        duration: 30 + randomInt(0, 90), // 30-120 menit
        passingScore: 70,
        categoryId: category.id,
        isActive: true,
        createdAt: new Date(Date.now() - randomInt(0, 86400000 * 60)), // Random 0-60 hari yang lalu
        updatedAt: new Date(),
      })
    }

    await db.tryout.createMany({
      data: dummyTryouts,
      skipDuplicates: true,
    })

    console.log('[GENERATE DUMMY DATA] Tryouts created:', dummyTryouts.length)

    // 4. Generate Dummy Questions
    const allTryouts = await db.tryout.findMany()
    const totalQuestions = allTryouts.length * questionsPerTryout

    for (const tryout of allTryouts) {
      const dummyQuestions = []
      for (let i = 0; i < questionsPerTryout; i++) {
        dummyQuestions.push({
          tryoutId: tryout.id,
          questionText: `Pertanyaan ${i + 1} untuk ${tryout.title}? Berapa hasil dari ${randomInt(1, 50)} + ${randomInt(1, 50)}?`,
          optionA: `Opsi A - ${randomInt(1, 100)}`,
          optionB: `Opsi B - ${randomInt(1, 100)}`,
          optionC: `Opsi C - ${randomInt(1, 100)}`,
          optionD: `Opsi D - ${randomInt(1, 100)}`,
          correctAnswer: ['A', 'B', 'C', 'D'][randomInt(0, 3)],
          explanation: `Pembahasan untuk pertanyaan ${i + 1}. Jawaban yang benar adalah jawaban yang paling logis.`,
          createdAt: new Date(Date.now() - randomInt(0, 86400000 * 60)), // Random 0-60 hari yang lalu
          updatedAt: new Date(),
        })
      }

      await db.question.createMany({
        data: dummyQuestions,
        skipDuplicates: true,
      })

      console.log(`[GENERATE DUMMY DATA] Questions created for tryout: ${tryout.title} (${dummyQuestions.length})`)
    }

    console.log('[GENERATE DUMMY DATA] Total questions created:', totalQuestions)

    // 5. Generate Dummy Results
    const dbUsers = await db.user.findMany({ take: users })
    const dbTryouts = await db.tryout.findMany({ take: tryouts })

    const dummyResults = []
    for (let i = 0; i < results; i++) {
      const user = dbUsers[randomInt(0, dbUsers.length)]
      const tryout = dbTryouts[randomInt(0, dbTryouts.length)]
      const score = randomInt(40, 100)

      // Generate random answers
      const questions = await db.question.findMany({
        where: { tryoutId: tryout.id },
        take: 20,
      })

      const answers: Record<string, string> = {}
      let correctAnswers = 0

      for (const question of questions) {
        const options = ['A', 'B', 'C', 'D']
        const userAnswer = options[randomInt(0, 3)]
        answers[question.id] = userAnswer

        if (userAnswer === question.correctAnswer) {
          correctAnswers++
        }
      }

      dummyResults.push({
        tryoutId: tryout.id,
        userId: user.id,
        userName: user.name,
        score: parseFloat(score.toFixed(2)),
        totalQuestions: questions.length,
        correctAnswers,
        answers: JSON.stringify(answers),
        timeTaken: randomInt(1800, 7200), // 30-120 menit (detik)
        passed: score >= 70,
        completedAt: new Date(Date.now() - randomInt(0, 86400000 * 30)), // Random 0-30 hari yang lalu
      })
    }

    await db.result.createMany({
      data: dummyResults,
      skipDuplicates: true,
    })

    console.log('[GENERATE DUMMY DATA] Results created:', dummyResults.length)

    return NextResponse.json({
      message: 'Data dummy berhasil di-generate',
      summary: {
        usersCreated: dummyUsers.length,
        categoriesCreated: dbCategories.length,
        tryoutsCreated: dummyTryouts.length,
        questionsCreated: totalQuestions,
        resultsCreated: dummyResults.length,
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[GENERATE DUMMY DATA] Error:', error)
    return NextResponse.json(
      {
        error: 'Gagal meng-generate data dummy',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
