/**
 * Configuration file
 *
 * @package EssenceTool
 */
 
define ([], function () {
    
    return {
    
        /** @var version String */
        version: 'v0.1 beta',
        
        
        /** @var base_url String */
        base_url: '/essence/',
        
        
        /** @var push_notifications_public_key String */
        push_notifications_public_key: 'BPRfaOp5bykOt8pZUg0z_OehejDUUinmgSLO9gJc3pnkmIM6ddjimD5QocE7UjjGaUYzyGJkC1GqJIJ3LCQFlNQ',
        
        
        /** @var protected_controllers Array Blacklist for controllers without authentication */
        protected_controllers: [],
        
    }

});