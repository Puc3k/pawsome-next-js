import { z } from 'zod'

export const DogUrlSchema = z.url('The value provided is not a valid URL')

export const DogApiResponseSchema = z.object({
  message: z.array(DogUrlSchema).min(2, 'Pool should include at least two dogs for the match'),
  status: z.literal("success"),
})

export const WinnerPayloadSchema = z.object({
  url: DogUrlSchema,
  createdAt: z.date().default(() => new Date())
})

export type DogApiResponse = z.infer<typeof DogApiResponseSchema>
export type ValidatedDogPool = z.infer<typeof DogApiResponseSchema>['message']
export type WinnerPayload = z.infer<typeof WinnerPayloadSchema>