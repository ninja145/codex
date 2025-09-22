import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const db = admin.firestore();

// This function would be scheduled to run daily, e.g., using functions.pubsub.schedule('every 24 hours')
export const checkBaDeactivation = functions.https.onRequest(async (req, res) => {
    // This is a placeholder for a scheduled function.
    // In a real app, this would be triggered by a cron job, not an HTTP request.
    // It would also require authentication to prevent unauthorized execution.

    const now = new Date();
    const sixtyDaysAgo = new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000));
    const ninetyDaysAgo = new Date(now.getTime() - (90 * 24 * 60 * 60 * 1000));

    try {
        const activeBAsQuery = await db.collection('ba').where('status', '==', 'active').get();

        const deactivationPromises: Promise<any>[] = [];

        activeBAsQuery.forEach(doc => {
            const ba = doc.data();
            const baRef = doc.ref;
            const createdAt = ba.createdAt.toDate();

            // Rule 1: Minimum 60 doctors in 60 days
            if (createdAt < sixtyDaysAgo && ba.conversionStats.totalOnboarded < 60) {
                functions.logger.info(`Deactivating BA ${ba.uid} due to low onboarding.`);
                deactivationPromises.push(baRef.update({ status: 'deactivated' }));
                return; // Move to next BA
            }

            // Rule 2: Minimum 60% conversion by day 90
            if (createdAt < ninetyDaysAgo) {
                const conversionRate = (ba.conversionStats.paidConversions / ba.conversionStats.totalOnboarded) || 0;
                if (conversionRate < 0.6) {
                    functions.logger.info(`Deactivating BA ${ba.uid} due to low conversion rate.`);
                    deactivationPromises.push(baRef.update({ status: 'deactivated' }));
                }
            }
        });

        await Promise.all(deactivationPromises);
        res.status(200).send('BA deactivation check completed.');

    } catch (error) {
        functions.logger.error('Error in checkBaDeactivation:', error);
        res.status(500).send('An error occurred.');
    }
});
