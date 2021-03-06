/*
*
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
* This file is part of jAPS software.
* jAPS is a free software; 
* you can redistribute it and/or modify it
* under the terms of the GNU General Public License (GPL) as published by the Free Software Foundation; version 2.
* 
* See the file License for the specific language governing permissions   
* and limitations under the License
* 
* 
* 
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpaddressbook.aps.system.services.addressbook;

import com.agiletec.aps.system.common.entity.IEntityDAO;
import com.agiletec.plugins.jpaddressbook.aps.system.services.addressbook.model.IContact;

/**
 * @author E.Santoboni
 */
public interface IAddressBookDAO extends IEntityDAO {
	
	public void addContact(IContact contact);
	
	public void deleteContact(String contactKey);
	
	public void updateContact(IContact contact);
	
}
