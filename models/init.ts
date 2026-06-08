import { getDb } from '@/lib/mongodb'
import { ensureProfiles } from './profiles'
import { ensureCars } from './cars'
import { ensureBookings } from './bookings'
import { ensureWishlist } from './wishlist'
import { ensureReviews } from './reviews'
import { ensureNotifications } from './notifications'
import { ensurePartners } from './partners'

let initialized = false

export async function ensureDb() {
  if (initialized) return
  const db = await getDb()

  // create collections and indexes in parallel
  await Promise.all([
    ensureProfiles(db),
    ensureCars(db),
    ensureBookings(db),
    ensureWishlist(db),
    ensureReviews(db),
    ensureNotifications(db),
    ensurePartners(db),
  ])

  // eslint-disable-next-line no-console
  console.log('MongoDB schema ensured')
  initialized = true
}

export default ensureDb
