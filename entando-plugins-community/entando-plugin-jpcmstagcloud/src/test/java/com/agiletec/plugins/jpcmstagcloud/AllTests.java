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
package com.agiletec.plugins.jpcmstagcloud;

import junit.framework.Test;
import junit.framework.TestSuite;
import com.agiletec.plugins.jpcmstagcloud.aps.system.services.tagcloud.TestTagCloudManager;

/**
 * @author E.Santoboni
 */
public class AllTests {
	
	public static Test suite() {
		TestSuite suite = new TestSuite("Test for jpcmstagcloud");
		System.out.println("Test for jpcmstagcloud");
		
		suite.addTestSuite(TestTagCloudManager.class);
		
		return suite;
	}
	
}